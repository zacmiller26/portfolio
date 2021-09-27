
export type ElementType<T extends ReadonlyArray <unknown>> =
  T extends ReadonlyArray<infer ElementType> ? ElementType : never

export interface SiteSectionPropsType {
    firstName: string
    lastName: string
  }
