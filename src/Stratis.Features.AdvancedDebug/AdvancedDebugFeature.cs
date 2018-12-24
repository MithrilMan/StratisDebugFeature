using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Stratis.Bitcoin.Builder.Feature;
using Stratis.Bitcoin.Utilities;

namespace Stratis.Features.AdvancedDebug
{
    public class AdvancedDebugFeature : FullNodeFeature
    {
        private readonly ILoggerFactory loggerFactory;

        public AdvancedDebugFeature(ILoggerFactory loggerFactory)
        {
            this.loggerFactory = Guard.NotNull(loggerFactory, nameof(loggerFactory));
        }

        /// <inheritdoc />
        public override Task InitializeAsync()
        {
            // Replace default logger with custom implementation.

            return Task.CompletedTask;
        }

        /// <inheritdoc />
        public override void Dispose()
        {
        }
    }
}

//https://github.com/dotnet-architecture/eShopOnContainers/blob/master/src/BuildingBlocks/EventBus/EventBus/Abstractions/IDynamicIntegrationEventHandler.cs
//https://docs.microsoft.com/it-it/dotnet/standard/microservices-architecture/multi-container-microservice-net-applications/integration-event-based-microservice-communications
//https://docs.microsoft.com/en-us/dotnet/standard/microservices-architecture/multi-container-microservice-net-applications/subscribe-events
//https://github.com/mayuanyang/Mediator.Net
//https://github.com/mxjones/RedBus