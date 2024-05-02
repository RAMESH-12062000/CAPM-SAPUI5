import type { Chart, LineItem } from '@sap-ux/vocabularies-types/vocabularies/UI';
import type { FileData } from '@sap/ux-specification-types';
import type * as v4controls from './export/controls';
import type * as v4pages from './export/pages';
export type V4Controls = typeof v4controls;
export type V4Pages = typeof v4pages;
export type PresentationVariantV4 = Chart | LineItem;
export interface PageConnection {
    entitySet?: string;
    contextPath?: string;
}
export interface ExtensionFileData {
    file: FileData;
    relativeFilePath: string;
    connection: PageConnection;
}
//# sourceMappingURL=types.d.ts.map