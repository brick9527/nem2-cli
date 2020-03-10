/*
 *
 * Copyright 2018-present NEM
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import {
  TransactionStatement,
  BalanceTransferReceipt,
  BalanceChangeReceipt,
  ArtifactExpiryReceipt,
  InflationReceipt,
} from 'symbol-sdk'
import {
  BalanceTransferReceiptView,
  BalanceChangeReceiptView,
  ArtifactExpiryReceiptView,
  InflationReceiptView,
} from './transactionStatements'
import chalk from 'chalk'

export class TransactionStatementsView {
  /**
   * Properties height. The receipt of the block height
   * @type {number}
   */
  height: number

  /**
   * Properties transactionStatements table
   * @type {any}
   */
  transactionStatementsTable: any

  /**
   * Properties balanceChangeReceipt table
   * @type {any}
   */
  balanceChangeReceiptTable: any

  /**
   * Properties artifactExpiryReceipt table
   * @type {any}
   */
  artifactExpiryReceiptTable: any

  /**
   * Properties InflationReceipt table
   * @type {any}
   */
  InflationReceiptTable: any

  /**
   * Property title
   */
  title: string

  /**
   * Creates an instance of TransactionStatementsView.
   * @param {TransactionStatement[]} transactionStatements - transactionStatements list
   */
  constructor(transactionStatements: TransactionStatement[]) {
    this.title = chalk.green('TransactionStatements')

    transactionStatements.map((transaction: TransactionStatement, transactionIndex: number) => {
      this.height = transaction.height.compact()

      transaction.receipts.map((receipt: any, receiptIndex: number) => {
        if (receipt instanceof BalanceTransferReceipt) {
          this.transactionStatementsTable = new BalanceTransferReceiptView(receipt)
        } else if(receipt instanceof BalanceChangeReceipt) {
          this.balanceChangeReceiptTable = new BalanceChangeReceiptView(receipt)
        } else if(receipt instanceof ArtifactExpiryReceipt) {
          this.artifactExpiryReceiptTable = new ArtifactExpiryReceiptView(receipt)
        } else if(receipt instanceof InflationReceipt) {
          this.InflationReceiptTable = new InflationReceiptView(receipt)
        }
      })
    })
  }
}
