using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.IO;
using System.Data;

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


        [HttpPost]
        [AllowAnonymous]
        public ActionResult GetLineItemReport(string filterExpression, string locNotes)
        {
            try
            {

                //HttpContext.Response.Clear();
                //HttpContext.Response.ClearContent();
                //HttpContext.Response.ClearHeaders();
                //HttpContext.Response.Buffer = true;
                //HttpContext.Response.ContentType = "application/ms-excel";
                //HttpContext.Response.AddHeader("Content-Disposition", "attachment;filename=Reports.xls");

                //application/vnd.ms-excel, text/plain
                // var contentType = filePath.Contains(".xlsx") ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" : "text/plain";

                //File(memoryStream.GetBuffer(), "text/plain", "file.txt");
                //ServiceChannel.UI.ClassicAsp.Subscribers\Areas\ServiceProviders\Controllers\ServiceProvidersController.cs
                List<string> reportList = new List<string>();
                reportList.Add("Column1" + "\t" + "Column2");
                reportList.Add("111" + "\t" + "222");


                //WAY 3
                //DataTable dt = Helpers.Test.CreateTemplatesDataTable(reportList);
                //Helpers.Test.ExporttoExcel(dt);


                //WAY 1
                
                byte[] buffer;
                using (var memstream = new MemoryStream())
                {
                    using (var fileWr = new StreamWriter(memstream))
                    {
                        foreach(var sLine in reportList)
                        {
                            fileWr.WriteLine(sLine);

                        }
                        fileWr.Flush();
                    }
                    buffer = memstream.ToArray();
                }
                var fileInfo = File(buffer, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                fileInfo.FileDownloadName = "ProposalLineItem_" + DateTime.Now.ToShortDateString() + ".xls";
                return fileInfo;
                
                //WAY 2
                /*
                System.IO.MemoryStream memoryStream = new System.IO.MemoryStream();
                System.IO.TextWriter tw = new System.IO.StreamWriter(memoryStream);
                tw.WriteLine("filterExpression" + ", " + locNotes);
                tw.Flush();
                tw.Close();
                var fileInfo = File(memoryStream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                fileInfo.FileDownloadName = "ProposalLineItem_" + DateTime.Now.ToShortDateString() + ".xls";
                return fileInfo;
                */
            }
            catch (System.Exception ex)
            {
                HttpContext.Response.StatusCode = (int)System.Net.HttpStatusCode.BadRequest;
                return Json(new { status = "error", message = ex.Message });
            }
        }

        public void Capture()
        {
            var stream = Request.InputStream;
            string dump;

            using (var reader = new StreamReader(stream))
                dump = reader.ReadToEnd();

            var path = Server.MapPath("~/test.jpg");
            System.IO.File.WriteAllBytes(path, String_To_Bytes2(dump));
        }

        private byte[] String_To_Bytes2(string strInput)
        {
            int numBytes = (strInput.Length) / 2;
            byte[] bytes = new byte[numBytes];

            for (int x = 0; x < numBytes; ++x)
            {
                bytes[x] = Convert.ToByte(strInput.Substring(x * 2, 2), 16);
            }

            return bytes;
        }

    }
}