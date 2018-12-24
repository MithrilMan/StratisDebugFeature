using System.Collections.Generic;
using NLog;
using NLog.Targets;

namespace MyNamespace
{
    [Target("AdvancedLog")]
    public sealed class AdvancedLogTarget : TargetWithLayout
    {
        /// <summary>
        /// The default value of <see cref="MaxLogEventsPerSnapshot"/>.
        /// </summary>
        const int MAX_LOGEVENTS_PER_SNAPSHOT = 10240;

        private readonly Queue<LogEventInfo> unhandledMessages;

        /// <summary>
		/// Gets or sets the maximum number of log events to save in the case
		/// that a snapshot triggers.
		/// </summary>
		public int MaxLogEventsPerSnapshot { get; set; } = MAX_LOGEVENTS_PER_SNAPSHOT;

        //[RequiredParameter]
        //public string Host { get; set; }

        public AdvancedLogTarget()
        {
            this.unhandledMessages = new Queue<LogEventInfo>();
        }



        protected override void Write(LogEventInfo logEvent)
        {
            this.Layout.Render(logEvent);
            this.unhandledMessages.Enqueue(logEvent);
        }

        protected override void InitializeTarget()
        {
            base.InitializeTarget();
            //StartConnection(_Connection, Timeout, false);
        }
    }
}