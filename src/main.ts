// @ts-ignore isolatedModules

import { TimestampUpdater } from "./TimestampUpdater";

// 更新頻度(ms)
const interval_ms: number = 1000;

const updater = new TimestampUpdater(interval_ms);
updater.scheduleTimestampUpdate(window.location);







