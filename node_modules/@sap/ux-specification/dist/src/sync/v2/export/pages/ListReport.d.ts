import { v2 } from '@sap/ux-specification-types';
import type { ResponsiveTable, TreeTable, AnalyticalTable, GridTable } from '../controls/Table';
type TableClassType = ResponsiveTable | TreeTable | AnalyticalTable | GridTable;
export declare class ListReport implements v2.ListReportConfigV2 {
    fitContent?: boolean;
    filterBar?: v2.ListReportFilterBar;
    table?: TableClassType;
    footer?: v2.GenericFooter;
}
export {};
//# sourceMappingURL=ListReport.d.ts.map