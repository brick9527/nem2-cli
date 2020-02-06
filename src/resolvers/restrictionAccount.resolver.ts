import chalk from 'chalk'
import {AccountRestrictionFlags} from 'nem2-sdk'
import {ProfileOptions} from '../interfaces/profile.command'
import {Profile} from '../models/profile'
import {OptionsChoiceResolver} from '../options-resolver'
import {BinaryValidator} from '../validators/binary.validator'
import {Resolver} from './resolver'

/**
 * Restriction account address flags resolver
 */
export class RestrictionAccountAddressFlagsResolver implements Resolver {

    /**
     * Resolves a restriction account address flag provided by the user.
     * @param {ProfileOptions} options - Command options.
     * @param {Profile} secondSource - Secondary data source.
     * @param {string} altText - Alternative text.
     * @param {string} altKey - Alternative key.
     * @returns {number}
     */
    async resolve(options: ProfileOptions, secondSource?: Profile, altText?: string, altKey?: string): Promise<any> {
        const choices = [
            {title: 'AllowOutgoingAddress', value: 0},
            {title: 'BlockOutgoingAddress', value: 1},
            {title: 'AllowIncomingAddress', value: 2},
            {title: 'BlockIncomingAddress', value: 3},
        ]
        const index = +(await OptionsChoiceResolver(options,
            altKey ? altKey : 'flags',
            altText ? altText : 'Select the restriction flags: ',
            choices,
        ))
        if (index < 0 || index > 3) {
            console.log(chalk.red('ERR'), 'Unknown restriction flag.')
            return process.exit()
        }
        const accountRestriction = choices.find((item) => item.value === index)?.title as any
        return AccountRestrictionFlags[accountRestriction]
    }
}

/**
 * Restriction account mosaic flags resolver
 */
export class RestrictionAccountMosaicFlagsResolver implements Resolver {

    /**
     * Resolves a restriction account mosaic flag provided by the user.
     * @param {ProfileOptions} options - Command options.
     * @param {Profile} secondSource - Secondary data source.
     * @param {string} altText - Alternative text.
     * @param {string} altKey - Alternative key.
     * @returns {number}
     */
    async resolve(options: ProfileOptions, secondSource?: Profile, altText?: string, altKey?: string): Promise<any> {
        const choices = [
            {title: 'AllowMosaic', value: 0},
            {title: 'BlockMosaic', value: 1},
        ]
        const index = +(await OptionsChoiceResolver(options,
            altKey ? altKey : 'flags',
            altText ? altText : 'Select the restriction flags: ',
            choices,
        ))
        try {
            new BinaryValidator().validate(index)
        } catch (err) {
            console.log(chalk.red('ERR'), err)
            return process.exit()
        }
        return AccountRestrictionFlags[choices[index] as any]
    }
}

/**
 * Restriction account operation flags resolver
 */
export class RestrictionAccountOperationFlagsResolver implements Resolver {

    /**
     * Resolves a restriction account operation flag provided by the user.
     * @param {ProfileOptions} options - Command options.
     * @param {Profile} secondSource - Secondary data source.
     * @param {string} altText - Alternative text.
     * @param {string} altKey - Alternative key.
     * @returns {number}
     */
    async resolve(options: ProfileOptions, secondSource?: Profile, altText?: string, altKey?: string): Promise<number> {
        const choices = [
            {title: 'AllowOutgoingTransactionType', value: 0},
            {title: 'BlockOutgoingTransactionType', value: 1},
        ]
        const index = +(await OptionsChoiceResolver(options,
            altKey ? altKey : 'flags',
            altText ? altText : 'Select the restriction flags: ',
            choices,
        ))
        try {
            new BinaryValidator().validate(index)
        } catch (err) {
            console.log(chalk.red('ERR'), err)
            return process.exit()
        }
        return parseInt(AccountRestrictionFlags[choices[index] as any], 10)
    }
}
