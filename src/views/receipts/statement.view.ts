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
  Address,
  ArtifactExpiryReceipt,
  BalanceChangeReceipt,
  BalanceTransferReceipt,
  InflationReceipt,
  ReceiptType,
  ResolutionEntry,
  ResolutionStatement,
  Statement,
  TransactionStatement,
} from 'symbol-sdk'
import { TransactionStatementsView } from './TransactionStatements.view'

export class StatementView {
  /**
   * Properties statement. All data comes from it
   * @type {Statement}
   */
  statement: Statement

  /**
   * Properties transactionStatementView. The result of analyzing the data of TransactionStatement
   * @type {string}
   */
  private transactionStatementsView: string

  /**
   * Properties addressResolutionStatementsView. The result of analyzing the data of AddressResolutionStatement
   * @type {string}
   */
  private addressResolutionStatementsView: string

  /**
   * Properties mosaicResolutionStatements. The result of analyzing the data of MosaicResolutionStatements
   * @type {string}
   */
  private mosaicResolutionStatementsView: string


  /**
   * Creates an instance of StatementView.
   * @param {Statement} statement - original data statement
   */
  constructor(statement: Statement) {
    this.statement = statement
    // TODO: 处理数据分析
    this.transactionStatementsView = new TransactionStatementsView(statement?.transactionStatements).toString()
  }

  /**
   * Logs the table
   */
  print(): void {
    // console.log(this.render().toString())
  }
}
