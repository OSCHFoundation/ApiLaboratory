import React from 'react';
import OptionsTablePair from './OptionsTable/Pair';
import HelpMark from './HelpMark';
import PubKeyPicker from './FormComponents/PubKeyPicker';
import SequencePicker from './FormComponents/SequencePicker';
import StroopsPicker from './FormComponents/StroopsPicker';
import MemoPicker from './FormComponents/MemoPicker';
import TimeBoundsPicker from './FormComponents/TimeBoundsPicker';
import {connect} from 'react-redux';
import {StrKey} from 'stellar-sdk';
import NETWORK from '../constants/network';
import {fetchSequence} from '../actions/transactionBuilder';

export default function TxBuilderAttributes(props) {
  let {onUpdate, attributes} = props;

  return <div className="TransactionAttributes">
    <div className="TransactionOp__config TransactionOpConfig optionsTable">
      <OptionsTablePair label={<span>Source Account <HelpMark href="http://112.64.158.146:90/projects/black-hole/wiki/%E8%B4%A6%E6%88%B7" /></span>}>
        <PubKeyPicker
          value={attributes['sourceAccount']}
          onUpdate={(value) => {onUpdate('sourceAccount', value)}}
          />
        <p className="optionsTable__pair__content__note">如果你至今没有一个账户，你可以创建在<a href="#account-creator">账户创建</a>.</p>
      </OptionsTablePair>
      <OptionsTablePair label={<span>Transaction Sequence Number </span>}>
        <SequencePicker
          value={attributes['sequence']}
          onUpdate={(value) => {onUpdate('sequence', value)}}
          />
        <p className="optionsTable__pair__content__note">交易序列号一般使账户里面序列号增加一</p>
        <SequenceFetcher />
      </OptionsTablePair>
      <OptionsTablePair optional={true} label={<span>Base Fee</span>}>
        <StroopsPicker
          value={attributes['fee']}
          onUpdate={(value) => {onUpdate('fee', value)}}
          />
        <p className="optionsTable__pair__content__note">网络基础手续费目前为10OSCH, "事务"费用等于基础费用乘有多少个”operation“数量。</p>
      </OptionsTablePair>
      <OptionsTablePair optional={true} label={<span>memo(备注)</span>}>
        <MemoPicker
          value={{
            type: attributes.memoType,
            content: attributes.memoContent,
          }}
          onUpdate={(value) => {onUpdate('memo', value)}}
          />
      </OptionsTablePair>
      <OptionsTablePair optional={true} label={<span>Time Bounds </span>}>
        <TimeBoundsPicker
          value={{
            minTime: attributes.minTime,
            maxTime: attributes.maxTime
          }}
          onUpdate={(value) => {onUpdate('timebounds', value)}}
          />
        <p className="optionsTable__pair__content__note">输入一个unix时间戳设置这个事务生效时间段。</p>
      </OptionsTablePair>
    </div>
  </div>
}

class sequenceFetcherClass extends React.Component {
  render() {
    let {attributes, sequenceFetcherError} = this.props.state;
    let dispatch = this.props.dispatch;
    let horizonURL = this.props.horizonURL;
    if (!StrKey.isValidEd25519PublicKey(attributes.sourceAccount)) {
      return null;
    }

    let sequenceErrorMessage;
    if (sequenceFetcherError.length > 0) {
      sequenceErrorMessage = <span className="optionsTable__pair__content__note optionsTable__pair__content__note--alert">
        {sequenceFetcherError}
      </span>
    }

    let truncatedAccountId = attributes.sourceAccount.substr(0,10);

    return <p className="optionsTable__pair__content__note">
      <a
        className="s-button"
        onClick={() => dispatch(
          fetchSequence(attributes.sourceAccount, horizonURL)
        )}
        >Fetch next sequence number for account starting with "{truncatedAccountId}"</a>
      <br />
      <small>Fetching from: <code>{horizonURL}</code></small><br />
      {sequenceErrorMessage}
    </p>
  }
}

let SequenceFetcher = connect(chooseState)(sequenceFetcherClass);
function chooseState(state) {
  return {
    state: state.transactionBuilder,
    horizonURL: state.network.current.horizonURL,
  }
}
