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
const formOptions = formOptionsBuilder(form, prefix, cryptoType);
const BTCApplyForm = reduxForm(formOptions)(BaseApplyForm);

const priceSelector = state => state.coinsPrice.pricesById.bitcoin;
const mapStateToProps = mapStateToPropsBuilder(form, priceSelector);

export default connect(mapStateToProps, mapDispatchToProps)(BTCApplyForm);
