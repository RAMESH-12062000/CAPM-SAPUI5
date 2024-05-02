import { v2 } from '@sap/ux-specification-types';
import type { AnalyticalTable } from '../controls/Table';
export declare class AnalyticalListPage implements v2.AnalyticalListPageConfigV2 {
    fitContent?: boolean;
    table?: AnalyticalTable;
    filterBar?: v2.AnalyticalListPageFilterBar;
    chart?: v2.ChartSettings;
    footer?: v2.GenericFooter;
    keyPerformanceIndicators: {
        [k: string]: v2.KPISettings;
    };
}
//# sourceMappingURL=AnalyticalListPage.d.ts.map