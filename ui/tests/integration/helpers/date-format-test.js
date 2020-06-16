import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | date-format', function(hooks) {
  setupRenderingTest(hooks);

  test('it is able to format a date object', async function(assert) {
    let today = new Date();
    this.set('today', today);

    /*
    The hbs helper allows us to render any markup we normally would
    in a regular template. It gives us access to all of the same
    helpers and syntax.
    */
    await render(hbs`<p>Date: {{date-format today "YYYY"}}</p>`);

    assert.dom(this.element).includesText(today.getFullYear(), 'it renders the date in the year format');
  });

  test('it supports date timestamps', async function(assert) {
    let today = new Date().getTime();
    this.set('today', today);

    await render(hbs`<p class="date-format">{{date-format today 'hh:mm:ss'}}</p>`);
    let formattedDate = document.querySelector('.date-format').innerText;
    assert.ok(formattedDate.match(/^\d{2}:\d{2}:\d{2}$/));
  });

  test('it supports date strings', async function(assert) {
    let todayString = new Date().getFullYear().toString();
    this.set('todayString', todayString);

    await render(hbs`<p>Date: {{date-format todayString}}</p>`);
    assert.dom(this.element).includesText(todayString, 'it renders the a date if passed in as a string');
  });
});
