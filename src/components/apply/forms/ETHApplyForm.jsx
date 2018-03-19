import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import BaseApplyForm, {
  mapStateToPropsBuilder,
  mapDispatchToProps,
  formOptionsBuilder
} from './BaseApplyForm';

// Settings
const form = 'apply-form-eth';
const prefix = 'ETH ';
const cryptoType = 1;

// Redux form
const formOptions = formOptionsBuilder(form, prefix, cryptoType);
const ETHApplyForm = reduxForm(formOptions)(BaseApplyForm);

// Redux connect
const priceSelector = state => state.coinsPrice.pricesById.ethereum;
const mapStateToProps = mapStateToPropsBuilder(form, priceSelector);

export default connect(mapStateToProps, mapDispatchToProps)(ETHApplyForm);
