using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace AssetWebTest.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public class TestAsset
        {
            public int? AssetId { get; set; }

            public string Name { get; set; }
            public decimal? Money { get; set; }

        }
        [HttpPost]
        [AllowAnonymous]
        public JsonResult GetTest(int proposalId)
        {
            TestAsset aTest = new TestAsset();
            aTest.AssetId = default(int?);
            aTest.Name = string.Empty;
            aTest.Money = 123456.98m;
            var jsonSerialiser = new JavaScriptSerializer();
            var jsonPR = jsonSerialiser.Serialize(aTest);

            return new JsonResult { Data = new { jsonPR, isSuccess = true }, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
    }
}