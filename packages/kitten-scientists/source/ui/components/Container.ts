import { KittenScientists } from "../../KittenScientists.js";
import { UiComponent, UiComponentOptions } from "./UiComponent.js";

export class Container extends UiComponent {
  readonly element: JQuery;

  /**
   * Constructs a simple container element without any special properties.
   *
   * @param host A reference to the host.
   * @param options Options for the container.
   */
  constructor(host: KittenScientists, options?: Partial<UiComponentOptions>) {
    super(host, options);

    const element = $("<div/>");

    this.element = element;
    this.addChildren(options?.children);
  }
}
