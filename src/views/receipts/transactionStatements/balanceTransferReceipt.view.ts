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
  BalanceTransferReceipt,
  ReceiptType,
  ReceiptVersion,
  NamespaceId,
  MosaicId,
  UInt64,
} from 'symbol-sdk'
import {Cell, HorizontalTable} from 'cli-table3'

export class BalanceTransferReceiptView {
  /**
   * Properties version
   * @type {number}
   */
  version: ReceiptVersion

  /**
   * Properties type
   * @type {ReceiptType}
   */
  type: ReceiptType

  /**
   * Properties recipientAddress
   * @type {Address | NamespaceId}
   */
  recipientAddress: Address | NamespaceId

  /**
   * Properties senderPublickey
   * @type {senderPublickey}
   */
  senderPublickey: string

  /**
   * Properties mosaicId
   * @type {MosaicId}
   */
  mosaicId: MosaicId

  /**
   * Properties amount
   * @type {UInt64}
   */
  amount: UInt64

  /**
   * Properties size
   * @type {number | undefined}
   */
  size: number | undefined

  /**
   * Creates an instance of BalanceTransferReceiptView.
   */
  constructor(receipt: BalanceTransferReceipt) {
    this.version = receipt.version
    this.type = receipt.type
    this.recipientAddress = receipt.recipientAddress
    this.senderPublickey = receipt.sender.publicKey
    this.mosaicId = receipt.mosaicId
    this.amount = receipt.amount
    this.size = receipt.size
  }

  /**
   * Parse the instance to a DTO
   */
  toDTO() {
    return [
      this.version,
      ReceiptType[this.type],
      this.recipientAddress instanceof Address ? this.recipientAddress.pretty() : this.recipientAddress.toHex(),
      this.senderPublickey,
      this.mosaicId.toHex(),
      this.amount.toString(),
      this.size,
    ]
  }

  /**
   * Set row span of a column
   * @param {string | number} content - the row content
   * @param {number | undefined} rowSpan - the row span number
   */
  private setRowSpan(content: string | number, rowSpan?: number) {
    if (rowSpan) {
      return { rowSpan, content }
    }
    return content
  }

  /**
   * Set column span of a row
   * @param {string | number} content - the column content
   * @param {number | undefined} colSpan - the column span number
   */
  private setColSpan(content: string | number, colSpan?: number) {
    if (colSpan) {
      return { colSpan, content }
    }
    return content
  }
}
