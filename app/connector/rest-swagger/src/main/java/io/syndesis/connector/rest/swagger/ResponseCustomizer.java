/*
 * Copyright (C) 2016 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.syndesis.connector.rest.swagger;

import java.io.IOException;
import java.util.Map;

import io.syndesis.common.model.DataShape;
import io.syndesis.common.model.DataShapeKinds;
import io.syndesis.common.model.OutputDataShapeAware;
import io.syndesis.integration.component.proxy.ConnectorComponentCustomizer;

import org.apache.camel.component.connector.ConnectorComponent;
import org.apache.camel.util.ObjectHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.JsonNode;

public final class ResponseCustomizer implements ConnectorComponentCustomizer, OutputDataShapeAware {

    private static final Logger LOG = LoggerFactory.getLogger(ResponseCustomizer.class);

    private DataShape dataShape;

    private boolean isUnifiedDataShape;

    @Override
    public void customize(final ConnectorComponent component, final Map<String, Object> options) {
        if (isUnifiedDataShape) {
            component.setAfterProducer(new ResponsePayloadConverter());
        }
    }

    @Override
    public DataShape getOutputDataShape() {
        return dataShape;
    }

    @Override
    public void setOutputDataShape(final DataShape dataShape) {
        this.dataShape = dataShape;

        isUnifiedDataShape = isUnifiedDataShape(dataShape);
    }

    static boolean isLegacyUnifiedDataShape(final JsonNode jsonSchema) {
        // for backward compatibility we need to look if there are
        // `parameters or `body` properties as the early version did not
        // identify the schema via `id` (`$id`) property
        final JsonNode properties = jsonSchema.get("properties");
        if (isNullNode(properties)) {
            return false;
        }

        final JsonNode parameters = properties.get("parameters");
        final JsonNode body = properties.get("body");
        if (isNullNode(parameters) && isNullNode(body)) {
            return false;
        }

        if (isNullNode(parameters)) {
            // body != null, so we consider anything that contains `body` as
            // wrapped
            return true;
        }

        // for parameters we can look and see if `Status` and `Content-Type` are
        // present
        final JsonNode propertiesOfParameters = parameters.get("properties");

        final JsonNode status = propertiesOfParameters.get("Status");
        final JsonNode contentType = propertiesOfParameters.get("Content-Type");

        return !isNullNode(status) && !isNullNode(contentType);
    }

    static boolean isNullNode(final JsonNode node) {
        return node == null || node.isNull();
    }

    static boolean isUnifiedDataShape(final DataShape dataShape) {
        if (dataShape == null || dataShape.getKind() != DataShapeKinds.JSON_SCHEMA) {
            return false;
        }

        final String specification = dataShape.getSpecification();
        if (ObjectHelper.isEmpty(specification)) {
            return false;
        }

        final JsonNode jsonSchema;
        try {
            jsonSchema = PayloadConverterBase.MAPPER.readTree(specification);
        } catch (final IOException e) {
            LOG.warn("Unable to parse data shape as a JSON: {}", e.getMessage());
            LOG.debug("Failed parsing JSON datashape: `{}`", specification, e);
            return false;
        }

        // we're using Draft 4, in Draft 6+ this should be `$id`
        final JsonNode id = jsonSchema.get("id");
        if (!isNullNode(id) && "io:syndesis:wrapped".equals(id.asText())) {
            return true;
        }

        return isLegacyUnifiedDataShape(jsonSchema);
    }
}
