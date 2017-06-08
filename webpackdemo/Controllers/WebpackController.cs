
using Newtonsoft.Json.Linq;
using System.Web.Mvc;

namespace YGOP.YouPeiLiangPin.Admin.UI.Controllers
{
    public class WebpackController : Controller
    {
        private string _applicationBasePath = null;
        public WebpackController()
        {
            _applicationBasePath = System.AppDomain.CurrentDomain.BaseDirectory;
        }

        // GET: Webpack
        public ActionResult Index()
        {

            //const string JAVASCRIPT_KEY = "js";

            //JObject json = WebpackHelper.GetWebpackAssetsJson(_applicationBasePath);
            ////ViewBag.VendorScripts = json.SelectToken("vendor").Value<string>(JAVASCRIPT_KEY);
            //ViewBag.AppScripts = json.SelectToken("wp").Value<string>(JAVASCRIPT_KEY);


            return View();
        }





    }


}