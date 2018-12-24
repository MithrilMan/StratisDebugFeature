using System.Threading.Tasks;

namespace Stratis.Features.AdvancedDebug.EventBus
{
    public interface IDynamicIntegrationEventHandler
    {
        Task Handle(dynamic eventData);
    }
}
