import chalk from 'chalk';
import {Profile} from '../model/profile';
import {OptionsResolver} from '../options-resolver';
import {ProfileOptions} from '../profile.command';
import {TransactionTypeValidator} from '../validators/transactionType.validator';
import {Resolver} from './resolver';

/**
 * Transaction type resolver
 */
export class TransactionTypeResolver implements Resolver {

    /**
     * Resolves a transaction type provided by the user.
     * @param {ProfileOptions} options - Command options.
     * @param {Profile} secondSource - Secondary data source.
     * @param {string} altText - Alternative text.
     * @returns {number}
     */
    async resolve(options: ProfileOptions, secondSource?: Profile, altText?: string): Promise<number> {
        const resolution = await OptionsResolver(options,
            'transactionType',
            () => undefined,
            altText ? altText : 'Enter the transaction type. Example: 4154 (Transfer): ');
        try {
            new TransactionTypeValidator().validate(resolution);
        } catch (err) {
            console.log(chalk.red('ERR'), err);
            return process.exit();
        }
        return parseInt(resolution, 16);
    }
}
