using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Security;
using System.Reflection;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace SimpleSSCClient
{
    class Program
    {
        public static string BaseHost = "http://sc81server/";

        static void Main(string[] args)
        {
            System.Net.ServicePointManager.ServerCertificateValidationCallback = delegate (object sender, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors) { return true; };
            //Task<string> result = RunAsync();
            //Console.WriteLine(result.Result);
            Requst();
            
            Console.ReadLine();
        }

        static async Task<string> RunAsync()
        {
            var result = string.Empty;
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(BaseHost);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response =
                    await client.PostAsync("sitecore/api/ssc/item/110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9", new StringContent(GetJsonCredentials(), Encoding.UTF8, "application/json"));
                if (response.IsSuccessStatusCode)
                {
                    result = await response.Content.ReadAsStringAsync();
                }

                Console.WriteLine(response.StatusCode.ToString());
            }

            return result;

        }

        public static void Requst()
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(BaseHost + "sitecore/api/ssc/item/110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9");

            request.Method = "GET";
            request.ContentType = "application/json";
            
            WebResponse response = request.GetResponse();

            var asHttpWebResponse = (HttpWebResponse) response;
            Console.WriteLine(asHttpWebResponse.StatusDescription);
            Console.WriteLine();
            Console.WriteLine("------Responce Headers-----------");
            Console.WriteLine();

            foreach (var key in asHttpWebResponse.Headers.AllKeys)
            {
                Console.WriteLine($"{key} : {asHttpWebResponse.Headers[key]}");
            }
            
            Stream dataStream = response.GetResponseStream();
            StreamReader reader = new StreamReader(dataStream);

            string responseFromServer = reader.ReadToEnd();

            Console.WriteLine();
            Console.WriteLine("------Response Body-----------");
            Console.WriteLine(responseFromServer);
            Console.WriteLine();

            reader.Close();
            dataStream.Close();
            response.Close();

        }

        public static string GetJsonCredentials()
        {
            var credentials = new { Domain = "sitecore", Username = "admin", Password = "b" };

            return JsonConvert.SerializeObject(credentials);
        }
    }
}
