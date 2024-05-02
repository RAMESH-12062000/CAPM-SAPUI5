import type { v2 } from '@sap/ux-specification-types';
export declare class CommonHeaderFacetSettings implements v2.CommonHeaderFacetSettings {
    visible?: boolean;
}
export declare class ObjectPageHeaderSectionForm extends CommonHeaderFacetSettings implements v2.ObjectPageHeaderSectionForm {
    visible?: boolean;
}
export declare class ObjectPageHeaderSectionChart extends CommonHeaderFacetSettings implements v2.ObjectPageHeaderSectionChart {
    visible?: boolean;
}
export declare class ObjectPageHeaderSectionDataPoint extends CommonHeaderFacetSettings implements v2.ObjectPageHeaderSectionDataPoint {
    visible?: boolean;
}
export declare class ObjectPageHeaderSectionAddress extends CommonHeaderFacetSettings implements v2.ObjectPageHeaderSectionAddress {
    visible?: boolean;
}
export declare class HeaderSections implements v2.HeaderSections {
    [key: string]: ObjectPageHeaderSectionAddress | ObjectPageHeaderSectionChart | ObjectPageHeaderSectionDataPoint | ObjectPageHeaderSectionForm;
}
//# sourceMappingURL=ObjectPageHeaderSection.d.ts.map