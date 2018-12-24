using Stratis.Bitcoin.Base;
using Stratis.Bitcoin.Builder;
using Stratis.Bitcoin.Configuration.Logging;

namespace Stratis.Features.AdvancedDebug
{
    /// <summary>
    /// A class providing extension methods for <see cref="IFullNodeBuilder"/>.
    /// </summary>
    public static class IFullNodeBuilderExtension
    {
        /// <summary>
        /// Uses the Proven Headers feature.
        /// </summary>
        /// <param name="fullNodeBuilder">The full node builder.</param>
        /// <returns><see cref="IFullNodeBuilder"/> instance</returns>
        public static IFullNodeBuilder UseProvenHeaders(this IFullNodeBuilder fullNodeBuilder)
        {
            LoggingConfiguration.RegisterFeatureNamespace<AdvancedDebugFeature>("advanceddebugger");

            fullNodeBuilder.ConfigureFeature(features =>
            {
                features
                    .AddFeature<AdvancedDebugFeature>()
                    .DependOn<BaseFeature>()
                    .FeatureServices(services =>
                    {
                        //services
                        //    .AddSingleton<ProvenHeadersConsensusManagerBehavior>()
                        //    .AddSingleton<ProvenHeadersConnectionManagerBehavior>()
                        //    .AddSingleton<ProvenHeadersBlockStoreBehavior>();

                        //if (allowLegacyHeadersForWhitelistedPeers)
                        //{
                        //    services.AddSingleton<WhitelistedLegacyPeerAllowed>();
                        //}

                        //new ProvenHeadersRulesRegistration().RegisterRules(fullNodeBuilder.Network.Consensus);
                    });
            });

            return fullNodeBuilder;
        }
    }
}