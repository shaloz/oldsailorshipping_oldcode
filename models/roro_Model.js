const mongoose = require("mongoose");
const Schema = mongoose.Schema;


var roro_rSchema = new mongoose.Schema({
  createdAt: { type: Date },
  Client: [{
    type: Schema.Types.ObjectId,
    ref: 'Clients'
  }],
  Consignee: [{
    type: Schema.Types.ObjectId,
    ref: 'Consignees'
  }],
  BookingConfirmation: [{
    type: Schema.Types.ObjectId,
    ref: 'BookingConfirmation'
  }],
  Cargo: [{
    type: Schema.Types.ObjectId,
    ref: 'Cargo'
  }],
  n_name: String,
  n_address: String,
  n_country: String,
  n_pnum: String,
  seal_num: String,
  demurrage: String,
  container_num: String,
  unit: String,
  aes_num: String,
  originals_tobe_released: String,
  cleint_is_agent: String,
  fowarding_agent_ref: String,
  description_of_charges: String,
  co_loaded_with: String,
  total_pre_paid: String,
  total_collected: String,
  destination_agent: String,
  containerlized: String,
  bill_of_lading_status: String,
  bill_of_lading_date: Date,
  invoice_date: Date,
  invoice_exist: { type: Boolean, default: false },
  ocean_freight: String,
  truck: String,
  ectn_becs: String,
  extra_charges: String,
  invoice_total: String,
  balance_due: String,
  more_invoice_fields: String,
  point_and_contry_of_origin: String,
  for_transhipment_to: String,
  label_charge3: String,

  more_invoice_fields_3: String,
  label_charge4: String,

  more_invoice_fields_2: String,
  label_charge2: String,


  label_charge1: String,




});



module.exports = mongoose.model('Roro_R', roro_rSchema);
