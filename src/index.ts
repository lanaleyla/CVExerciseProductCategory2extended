import { app } from './app';
import { getConfig } from './utils/configuration';
import { loadProducts, loadCategories } from '../src/controllers/httpCilentRequests';

const port = getConfig('PORT', 3000);
app.set('port', port);

//set up server and listen
const server = app.listen(app.get('port'), async () => {
  console.log(
    ' App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env'),
  );
  console.log(' Press CTRL-C to stop\n');
  await loadProducts();   //load product from json file
  await loadCategories(); //load categories from json file
});







