import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  Container,
  IntegrationDetailActivity,
  IntegrationDetailActivityItem,
  IntegrationDetailActivityItemSteps,
  IntegrationDetailDescription,
  IntegrationDetailHistoryListView,
  IntegrationDetailHistoryListViewItem,
  IntegrationDetailInfo,
  IntegrationDetailMetrics,
  IntegrationStepsHorizontalView,
  TabBar,
  TabBarItem,
} from '../../src';

const integrationPublishedHistoryItems = [
  <IntegrationDetailHistoryListViewItem
    key={0}
    integrationUpdatedAt={'Feb 24, 2019, 04:27:49'}
    integrationVersion={1}
    i18nTextHistoryMenuReplaceDraft={'Replace draft'}
    i18nTextHistoryMenuUnpublish={'Unpublish'}
    i18nTextLastPublished={'Last published on '}
    i18nTextVersion={'Version'}
  />,
];

const steps = [
  {
    name: 'SQL',
    pattern: 'From',
  },
  {
    name: 'Salesforce',
    pattern: 'To',
  },
];

const activityItemsSteps1 = [
  <IntegrationDetailActivityItemSteps
    key={0}
    duration={4}
    i18nHeaderDuration={'Duration'}
    i18nHeaderDurationUnit={'ms'}
    i18nHeaderOutput={'Output'}
    i18nHeaderStatus={'Status'}
    i18nHeaderStep={'Step'}
    i18nHeaderTime={'Time'}
    i18nNoOutput={'No output'}
    name={'Data Mapper'}
    output={'No output'}
    status={'Success'}
    time={'Mar 14, 2019, 14:24:29'}
  />,
  <IntegrationDetailActivityItemSteps
    key={1}
    duration={4}
    i18nHeaderDuration={'Duration'}
    i18nHeaderDurationUnit={'ms'}
    i18nHeaderOutput={'Output'}
    i18nHeaderStatus={'Status'}
    i18nHeaderStep={'Step'}
    i18nHeaderTime={'Time'}
    i18nNoOutput={'No output'}
    name={'Data Mapper'}
    output={'No output'}
    status={'Success'}
    time={'Mar 14, 2019, 14:24:29'}
  />,
];

const activityItemsSteps2 = [
  <IntegrationDetailActivityItemSteps
    key={0}
    duration={67}
    i18nHeaderDuration={'Duration'}
    i18nHeaderDurationUnit={'ms'}
    i18nHeaderOutput={'Output'}
    i18nHeaderStatus={'Status'}
    i18nHeaderStep={'Step'}
    i18nHeaderTime={'Time'}
    i18nNoOutput={'No output'}
    name={'Data Mapper'}
    output={
      '<pre>io.atlasmap.api.AtlasException: java.lang.IllegalArgumentException: document cannot be null nor empty</pre>'
    }
    status={'Error'}
    time={'Mar 14, 2019, 14:23:35'}
  />,
];

const activityItems = [
  <IntegrationDetailActivityItem
    children={activityItemsSteps1}
    date={'4/16/2019'}
    errorCount={4}
    i18nErrorsFound={'Errors found'}
    i18nNoErrors={'No errors'}
    i18nNoSteps={'No steps information was found for this integration'}
    i18nVersion={'Version'}
    key={0}
    time={'07:40:28'}
    version={2}
  />,
  <IntegrationDetailActivityItem
    children={activityItemsSteps2}
    date={'4/14/2019'}
    errorCount={0}
    i18nErrorsFound={'Errors found'}
    i18nNoErrors={'No errors'}
    i18nNoSteps={'No steps information was found for this integration'}
    i18nVersion={'Version'}
    key={1}
    time={'07:40:28'}
    version={2}
  />,
];

storiesOf('Integration/Detail', module)
  .add('Details Tab Page', () => (
    <Router>
      <>
        <Container
          style={{
            background: '#fff',
          }}
        >
          <IntegrationDetailInfo name={'Integration name'} version={1} />
          <TabBar>
            <TabBarItem label={'Details'} to={'#details'} />
            <TabBarItem label={'Activity'} to={'#activity'} />
            <TabBarItem label={'Metrics'} to={'#metrics'} />
          </TabBar>
        </Container>
        <IntegrationStepsHorizontalView steps={steps} />
        <IntegrationDetailDescription description={'This is my description.'} />
        <IntegrationDetailHistoryListView
          integrationIsDraft={false}
          children={integrationPublishedHistoryItems}
          i18nTextDraft={'Draft'}
          i18nTextHistory={'History'}
        />
      </>
    </Router>
  ))
  .add('Activity Tab Page', () => (
    <Router>
      <>
        <Container
          style={{
            background: '#fff',
          }}
        >
          <IntegrationDetailInfo name={'Integration name'} version={1} />
          <TabBar>
            <TabBarItem label={'Details'} to={'#details'} />
            <TabBarItem label={'Activity'} to={'#activity'} />
            <TabBarItem label={'Metrics'} to={'#metrics'} />
          </TabBar>
        </Container>
        <IntegrationDetailActivity
          i18nBtnRefresh={'Refresh'}
          i18nLastRefresh={'Last refresh'}
          i18nViewLogOpenShift={'View Log in OpenShift'}
          linkToOpenShiftLog={'/link'}
          children={activityItems}
        />
      </>
    </Router>
  ))
  .add('Metrics Tab Page', () => (
    <Router>
      <>
        <Container
          style={{
            background: '#fff',
          }}
        >
          <IntegrationDetailInfo name={'Integration name'} version={1} />
          <TabBar>
            <TabBarItem label={'Details'} to={'#details'} />
            <TabBarItem label={'Activity'} to={'#activity'} />
            <TabBarItem label={'Metrics'} to={'#metrics'} />
          </TabBar>
        </Container>
        <IntegrationDetailMetrics
          errorMessagesCount={2}
          okMessagesCount={2425}
          totalMessages={26126}
          uptimeStart={5358454957349}
        />
      </>
    </Router>
  ));
