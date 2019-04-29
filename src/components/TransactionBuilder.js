import React from 'react';
import {connect} from 'react-redux';
import {EndpointPicker} from './EndpointPicker';
import {EndpointSetup} from './EndpointSetup';
import {EndpointResult} from './EndpointResult';
import {PubKeyPicker} from './FormComponents/PubKeyPicker';
import TxBuilderAttributes from './TxBuilderAttributes';
import {
  addOperation,
  updateAttributes,
} from '../actions/transactionBuilder';
import OperationsBuilder from './OperationsBuilder';
import {getOperation} from '../data/operations';
import TxBuilderResult from './TxBuilderResult';
import {resetTxbuilder} from '../actions/transactionBuilder';

class TransactionBuilder extends React.Component {
  render() {
    let {dispatch} = this.props;
    let {
      attributes,
      operations,
    } = this.props.state;

    return <div className="TransactionBuilder">
      <div className="so-back">
        <div className="so-chunk">
          <div className="pageIntro">
            <p>事务构建器可以帮助你建立一个OSChain网络事务。</p>
            <p>
              事务在构建后是没有签名的，为了提交事务到账本中，这个事务还需要一个签名并提交到网络。  
            </p>
          </div>
          <p className="TransactionBuilder__clearBar">
            <a className="TransactionBuilder__clearBar__link"
            onClick={() => dispatch(resetTxbuilder())}>重制所有项</a>
          </p>
          <TxBuilderAttributes
            attributes={attributes}
            onUpdate={onAttributeUpdate.bind(this, dispatch)} />
          <OperationsBuilder />
          <div className="TransactionOperations__add">
            <button className="TransactionOperations__add__button s-button" onClick={() => dispatch(addOperation())}>
              + Add Operation
            </button>
          </div>
        </div>
      </div>
      <div className="so-back TransactionBuilder__result">
        <div className="so-chunk">
          <TxBuilderResult />
        </div>
      </div>
    </div>
  }
};

export default connect(chooseState)(TransactionBuilder);

function chooseState(state) {
  return {
    state: state.transactionBuilder,
  }
}

function onAttributeUpdate(dispatch, param, value) {
  let newAttributes = {};
  switch(param) {
  case 'sourceAccount':
    newAttributes.sourceAccount = value;
  break;
  case 'sequence':
    newAttributes.sequence = value;
    break;
  case 'fee':
    newAttributes.fee = value;
  break;
  case 'memo':
    newAttributes.memoType = value.type;
    newAttributes.memoContent = value.content;
  case 'timebounds':
    newAttributes.minTime = value.minTime;
    newAttributes.maxTime = value.maxTime;
  break;
  }
  dispatch(updateAttributes(newAttributes));
}
