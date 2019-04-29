import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import SelectPicker from './FormComponents/SelectPicker';
import extrapolateFromXdr from '../utilities/extrapolateFromXdr';
import TreeView from './TreeView';
import validateBase64 from '../utilities/validateBase64';
import {updateXdrInput, updateXdrType, fetchLatestTx} from '../actions/xdrViewer';
import NETWORK from '../constants/network';
import {xdr} from 'stellar-sdk';

function XdrViewer(props) {
  let {dispatch, state, baseURL} = props;

  let validation = validateBase64(state.input);
  let messageClass = validation.result === 'error' ? 'xdrInput__message__alert' : 'xdrInput__message__success';
  let message = <p className={messageClass}>{validation.message}</p>

  let xdrTypeIsValid = _.indexOf(xdrTypes, state.type) >= 0;
  let treeView, errorMessage;
  if (state.input === '') {
    errorMessage = <p>输入一个base-64编码XDR用来解码。</p>;
  } else if (!xdrTypeIsValid) {
    errorMessage = <p>Please select a XDR type</p>;
  } else {
    try {
      treeView = <TreeView nodes={extrapolateFromXdr(state.input, state.type)} />
    } catch (e) {
      console.error(e)
      errorMessage = <p>Unable to decode input as {state.type}</p>;
    }
  }

  return <div>
    <div className="XdrViewer__setup so-back">
      <div className="so-chunk">
        <div className="pageIntro">
          <p>外部数据表示(XDR)是标准数据序列化格式,OSChain网络用XDR编码数据。</p>
          <p>XDR解析器是一个将XDR格式解析为对人类阅读友好的方式。</p>
        </div>
        <p className="XdrViewer__label">输入一个base-64编码XDR文本或者<a onClick={() => dispatch(fetchLatestTx(baseURL))}>拉取最后的测试“事务</a>:</p>
        <div className="xdrInput__input">
          <textarea
            value={state.input}
            className="xdrInput__input__textarea"
            onChange={(event) => dispatch(updateXdrInput(event.target.value))}
            placeholder="Example: AAAAAGXNhB2hIkbP//jgzn4os/AAAAZAB+BaLPAAA5Q/xL..."></textarea>
        </div>
        <div className="xdrInput__message">
          {message}
        </div>

        <p className="XdrViewer__label">XDR类型:</p>
        <SelectPicker
          value={state.type}
          placeholder="Select XDR type"
          onUpdate={(input) => dispatch(updateXdrType(input))}
          items={xdrTypes}
        />
      </div>
    </div>
    <div className="XdrViewer__results so-back">
      <div className="so-chunk">
        {errorMessage}
        {treeView}
      </div>
    </div>
  </div>
}

export default connect(chooseState)(XdrViewer);
function chooseState(state) {
  return {
    state: state.xdrViewer,
    baseURL: state.network.current.horizonURL,
  }
}

// Array of all the xdr types. Then, the most common ones appear at the top
// again for convenience
let xdrTypes = _(xdr).functions().sort().value();
xdrTypes = ['TransactionEnvelope', 'TransactionResult', 'TransactionMeta', '---'].concat(xdrTypes)
