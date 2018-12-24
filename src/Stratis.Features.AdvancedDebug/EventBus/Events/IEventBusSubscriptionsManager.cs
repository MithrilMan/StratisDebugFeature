using System;
using System.Threading.Tasks;

namespace Stratis.Features.AdvancedDebug.EventBus.Events
{
    public class IntegrationEvent
    {
        public Guid Id { get; }
        public DateTime CreationDate { get; }

        public IntegrationEvent()
        {
            Id = Guid.NewGuid();
            CreationDate = DateTime.UtcNow;
        }
    }
}
