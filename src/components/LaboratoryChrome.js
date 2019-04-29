import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import NetworkPicker from './NetworkPicker';
import Introduction from './Introduction';
import AccountCreator from './AccountCreator';
import EndpointExplorer from './EndpointExplorer';
import TransactionBuilder from './TransactionBuilder';
import TransactionSigner from './TransactionSigner';
import XdrViewer from './XdrViewer';
import {RouterListener} from '../utilities/simpleRouter';
import SLUG from '../constants/slug';

function LaboratoryChrome(props) {
  let tabItem = (name, slug) => {
    return <a
      href={'#' + slug}
      className={classNames(
        'buttonList__item s-button s-button--min',
        {'is-active': props.routing.location === slug})}
      key={slug}>
      {name}
    </a>
  }

  return <div>
    <div className="so-back">
      <div className="so-chunk">
        <div className="so-siteHeader LaboratoryChrome__header">
          <span className="so-logo">
            <a href="https://www.myoschain.com/" className="so-logo__main">OSChain</a>
            <span className="so-logo__separator"> </span>
            <a href="#" className="so-logo__subSite">实验室</a>
          </span>
          <NetworkPicker />
        </div>
      </div>
    </div>
    <div className="so-back LaboratoryChrome__siteNavBack">
      <div className="so-chunk">
        <nav className="s-buttonList">
          {tabItem('介绍', SLUG.HOME)}
          {tabItem('账户创建', SLUG.ACCOUNT_CREATOR)}
          {tabItem('接口查询', SLUG.EXPLORER)}
          {tabItem('事务构造', SLUG.TXBUILDER)}
          {tabItem('事务签名', SLUG.TXSIGNER)}
          {tabItem('XDR可视化', SLUG.XDRVIEWER)}
        </nav>
      </div>
    </div>

    {getContent(props.routing.location)}
    <RouterListener />
  </div>;
}

function getContent(slug) {
  switch (slug) {
    case SLUG.HOME:
      return <Introduction />
    case SLUG.ACCOUNT_CREATOR:
      return <AccountCreator />;
    case SLUG.EXPLORER:
      return <EndpointExplorer />;
    case SLUG.TXBUILDER:
      return <TransactionBuilder />;
    case SLUG.TXSIGNER:
      return <TransactionSigner />;
    case 'xdr-viewer':
      return <XdrViewer />;
    default:
      return <SimplePage><p>Page "{slug}" not found</p></SimplePage>
  }
}

function SimplePage(props) {
  return <div className="so-back SimplePage__back">
    <div className="so-chunk">
      {props.children}
    </div>
  </div>
}

export default connect(chooseState)(LaboratoryChrome);
function chooseState(state) {
  return {
    routing: state.routing
  }
}
