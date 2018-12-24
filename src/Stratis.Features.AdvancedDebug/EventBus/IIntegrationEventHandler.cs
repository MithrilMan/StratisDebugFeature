using System.Threading.Tasks;
using Stratis.Features.AdvancedDebug.EventBus.Events;

namespace Stratis.Features.AdvancedDebug.EventBus
{
    public interface IIntegrationEventHandler<in TIntegrationEvent> : IIntegrationEventHandler
          where TIntegrationEvent : IntegrationEvent
    {
        Task Handle(TIntegrationEvent @event);
    }

    public interface IIntegrationEventHandler
    {
    }
}
