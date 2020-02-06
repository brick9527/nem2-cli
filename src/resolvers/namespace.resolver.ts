import chalk from 'chalk'
import {NamespaceId, NamespaceRegistrationType, UInt64} from 'nem2-sdk'
import {ProfileOptions} from '../interfaces/profile.command'
import {Profile} from '../models/profile'
import {OptionsResolver, OptionsConfirmResolver} from '../options-resolver'
import {NamespaceIdValidator} from '../validators/namespaceId.validator'
import {Resolver} from './resolver'
import {CommandOptions} from '../commands/transaction/namespace'
/**
 * Namespace name resolver
 */
export class NamespaceNameResolver {

    /**
     * Resolves a namespace name provided by the user.
     * @param {ProfileOptions} options - Command options.
     * @param {Profile} secondSource - Secondary data source.
     * @param {string} altText - Alternative text.
     * @param {string} altKey - Alternative key.
     * @returns {NamespaceId}
     */
    async resolve(options: ProfileOptions, secondSource?: Profile, altText?: string): Promise<NamespaceId> {
        const resolution = (await OptionsResolver(options,
        'namespaceName',
        () =>  undefined,
        altText ? altText : 'Enter the namespace name: ')).trim()
        return new NamespaceId(resolution)
    }
}

/**
 * Namespace id resolver
 */
export class NamespaceIdResolver implements Resolver {

    /**
     * Resolves a namespace id provided by the user.
     * @param {ProfileOptions} options - Command options.
     * @param {Profile} secondSource - Secondary data source.
     * @param {string} altText - Alternative text.
     * @returns {NamespaceId}
     */
    async resolve(options: ProfileOptions, secondSource?: Profile, altText?: string): Promise<NamespaceId> {
        const resolution = await OptionsResolver(options,
            'namespaceId',
            () =>  undefined,
            altText ? altText : 'Enter the namespace id in hexadecimal: ')
        try {
            new NamespaceIdValidator().validate(resolution)
        } catch (err) {
            console.log(chalk.red('ERR'), err)
            return process.exit()
        }
        const namespaceIdUInt64 = UInt64.fromHex(resolution)
        return new NamespaceId([namespaceIdUInt64.lower, namespaceIdUInt64.higher])
    }
}

/**
 * Namespace type resolver
 */
export class NamespaceTypeResolver  implements Resolver {

    /**
     * Resolves the namespace type.
     * @param {ProfileOptions} options - Command options.
     * @param {Profile} secondSource - Secondary data source.
     * @param {string} altText - Alternative text.
     * @returns {NamespaceRegistrationType}
     */
    async resolve(options: CommandOptions, secondSource?: Profile, altText?: string): Promise<NamespaceRegistrationType> {
        if (!options.subnamespace && !options.rootnamespace) {
            const resolution = await OptionsConfirmResolver(altText ? altText : 'Do you want to create a root namespace?')
            if (resolution) {
                options.rootnamespace = true
            }
        }
        let namespaceType = NamespaceRegistrationType.SubNamespace
        if (options.rootnamespace) {
            namespaceType = NamespaceRegistrationType.RootNamespace
        }
        return namespaceType
    }
}
