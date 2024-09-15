// @ts-check

import { UrlEntryWithSelector } from "./UrlEntryWithSelector";
import { DateFormatter } from "./DateFormatter";
import { AttributeAccessor } from "./AttributeAccessor";

/**
 * `UrlEntryWithDateFormat`
 * @interface
 * @description `UrlEntryWithSelector`に日付フォーマットとロケール、属性情報を追加したインターフェース
 * @extends UrlEntryWithSelector
 * @extends DateFormatter
 * @extends AttributeAccessor
 * @author M424
 */
export interface UrlEntryWithDateFormat extends UrlEntryWithSelector, DateFormatter, AttributeAccessor {}
