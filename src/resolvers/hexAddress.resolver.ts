import chalk from 'chalk';
import {Profile} from '../model/profile';
import {OptionsResolver} from '../options-resolver';
import {ProfileOptions} from '../profile.command';
import {HexAddressValidator} from '../validators/hexAddress.validator';
import {Resolver} from './resolver';

/**
 * Hex Address resolver
 */
export class HexAddressResolver implements Resolver {

    /**
     * Resolves an address provided by the user.
     * @param {ProfileOptions} options - Command options.
     * @param {Profile} secondSource - Secondary data source.
     * @param {string} altText - Alternative text.
     * @returns {Address}
     */
    async resolve(options: ProfileOptions, secondSource?: Profile, altText?: string): Promise<any> {
        const resolution = (await OptionsResolver(options,
            'address',
            () => secondSource ? secondSource.address.pretty() : undefined,
            altText ? altText : 'Enter an hex address: ')).trim();
        try {
            new HexAddressValidator().validate(resolution);
        } catch (err) {
            console.log(chalk.red('ERR'), err);
            return process.exit();
        }
        return resolution;
    }
}
