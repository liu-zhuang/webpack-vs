using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace webpackdemo.Common
{
    public class WebpackHelper
    {
    }

    public static class WebpackExtension
    {
        public static string GetResourceUrlHashChunk(this UrlHelper helper, string fileName)
        {
            JObject webpackAssetsJson = null;
            var applicationBasePath = System.AppDomain.CurrentDomain.BaseDirectory;
            string packageJsonFilePath = $"{applicationBasePath}\\{"package.json"}";

            using (StreamReader packageJsonFile = File.OpenText(packageJsonFilePath))
            {
                using (JsonTextReader packageJsonReader = new JsonTextReader(packageJsonFile))
                {
                    JObject packageJson = (JObject)JToken.ReadFrom(packageJsonReader);
                    JObject webpackConfigJson = (JObject)packageJson["customConfig"]["webpackConfig"];
                    string webpackAssetsFileName = webpackConfigJson["assetsFileName"].Value<string>();
                    string webpackBuildDirectory = webpackConfigJson["buildDirectory"].Value<string>();
                    string webpackAssetsFilePath = $"{applicationBasePath}\\{webpackBuildDirectory}\\{webpackAssetsFileName}";

                    using (StreamReader webpackAssetsFile = File.OpenText(webpackAssetsFilePath))
                    {
                        using (JsonTextReader webpackAssetsReader = new JsonTextReader(webpackAssetsFile))
                        {
                            webpackAssetsJson = (JObject)JToken.ReadFrom(webpackAssetsReader);
                        }
                    }
                    return "~/" + webpackBuildDirectory + webpackAssetsJson.SelectToken(fileName).Value<string>("js");

                }
            }
        }
    }
}