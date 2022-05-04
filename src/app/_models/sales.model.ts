export interface Sale {
  id:                number;
  date:              Date;
  method:            string;
  franchise:         string;
  transactionID:     string;
  amount:            number;
  hasDeduction:      boolean;
  deductionConcept?: string;
  deductionAmount?:  number;
  collectionState:   string;
  paymentMethod:     string;
}
