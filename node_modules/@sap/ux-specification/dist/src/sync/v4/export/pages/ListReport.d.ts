import type { v4 } from '@sap/ux-specification-types';
import type { Table, FilterBar, Header } from '../controls';
/**
 * Sync class for import and export of V4 list report
 */
export declare class ListReport implements v4.ListReportConfigV4 {
    chart?: v4.ALPChartView;
    table?: v4.ALPTableView | Table;
    variantManagement?: v4.VariantManagementTypeListReport;
    defaultPath?: v4.DefaultPathType;
    defaultTemplateAnnotationPath?: string;
    header?: Header;
    filterBar?: FilterBar;
}
//# sourceMappingURL=ListReport.d.ts.map