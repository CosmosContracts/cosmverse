import * as React from "react"

import { RenderOptions, render } from "@testing-library/react"

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
 <>{children}</>
)

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options })

export { customRender as render }
