import chalk from 'chalk'
import {ProfileOptions} from '../interfaces/profile.command'
import {Profile} from '../models/profile'
import {OptionsResolver} from '../options-resolver'
import {TransactionTypeValidator} from '../validators/transactionType.validator'
import {Resolver} from './resolver'

/**
 * Transaction type resolver
 */
export class TransactionTypeResolver implements Resolver {

    /**
     * Resolves a transaction type provided by the user.
     * @param {ProfileOptions} options - Command options.
     * @param {Profile} secondSource - Secondary data source.
     * @param {string} altText - Alternative text.
     * @param {string} altKey - Alternative key.
     * @returns {Promise<number>}
     */
    async resolve(options: ProfileOptions, secondSource?: Profile, altText?: string, altKey?: string): Promise<number> {
        const resolution = await OptionsResolver(options,
            altKey ? altKey : 'transactionType',
            () => undefined,
            altText ? altText : 'Enter the transaction type. Example: 4154 (Transfer): ')
        try {
            new TransactionTypeValidator().validate(resolution)
        } catch (err) {
            console.log(chalk.red('ERR'), err)
            return process.exit()
        }
        return parseInt(resolution, 16)
    }
}
