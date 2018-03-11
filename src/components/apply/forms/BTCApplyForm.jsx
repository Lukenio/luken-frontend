import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import BaseApplyForm, {
  mapStateToPropsBuilder,
  mapDispatchToProps,
  formOptionsBuilder
} from './BaseApplyForm';

const form = 'apply-form-btc';
const prefix = 'BTC ';
const cryptoType = 0;
const priceSelector = state => state.coinsPrice.pricesById.bitcoin;

const reduxBTCApplyForm = connect(
  mapStateToPropsBuilder(form, priceSelector),
  mapDispatchToProps
)(BaseApplyForm);

const BTCApplyForm = reduxForm(formOptionsBuilder(form, prefix, cryptoType))(
  reduxBTCApplyForm
);

export default BTCApplyForm;
