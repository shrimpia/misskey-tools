import React, {useMemo, useState} from 'react';
import {Log} from '../../common/types/log';
import dayjs from 'dayjs';

const LogItem: React.FC<{log: Log}> = ({log}) => {
	const time = dayjs(log.timestamp).format('hh:mm:ss');

	return (
		<div className={`log ${log.level}`}>
			[{time}] {log.text}
		</div>
	);
};

export const LogView: React.FC<{log: Log[]}> = ({log}) => {
	const [isVisibleInfo, setVisibleInfo] = useState(true);
	const [isVisibleWarn, setVisibleWarn] = useState(true);
	const [isVisibleError, setVisibleError] = useState(true);

	const filter = useMemo(() => {
		const levels: Log['level'][] = [];
		if (isVisibleError) levels.push('error');
		if (isVisibleWarn) levels.push('warn');
		if (isVisibleInfo) levels.push('info');

		return levels;
	}, [isVisibleError, isVisibleWarn, isVisibleInfo]);

	const filteredLog = useMemo(() => log.filter(l => filter.includes(l.level)), [log, filter]);

	return (
		<>
			<label className="input-check">
				<input type="checkbox" checked={isVisibleInfo} onChange={e => setVisibleInfo(e.target.checked)} />
				<span><i className="fas fa-circle-info fa-fw" /> INFO</span>
			</label>
			<label className="input-check">
				<input type="checkbox" checked={isVisibleWarn} onChange={e => setVisibleWarn(e.target.checked)} />
				<span><i className="fas fa-circle-exclamation fa-fw" /> WARN</span>
			</label>
			<label className="input-check">
				<input type="checkbox" checked={isVisibleError} onChange={e => setVisibleError(e.target.checked)} />
				<span><i className="fas fa-circle-xmark fa-fw" /> ERROR</span>
			</label>
			<div className="log-view vstack slim">
				{filteredLog.map(l => <LogItem log={l} key={l.text} />)}
			</div>
		</>
	);
};
