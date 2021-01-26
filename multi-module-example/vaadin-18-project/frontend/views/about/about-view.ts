import { css, customElement, html, LitElement } from 'lit-element';

import * as ResourceEndpoint from '../../generated/ResourceEndpoint';
import ResourceContainer from "../../generated/io/github/pgerhard/rest/v1/dto/ResourceContainer";

@customElement('about-view')
export class AboutView extends LitElement {

    private container: ResourceContainer = {data: []};

    constructor() {
        super();

    }

    static get styles() {
        return css`
      :host {
        display: block;
      }
    `;
    }

    render() {
        return html`
            <div>Content placeholder</div>
            <span>${this.container}</span>
        `;
    }

    async firstUpdated(_changedProperties: Map<PropertyKey, unknown>) {
        this.container = await ResourceEndpoint.loadResourceContainer();
    }
}
