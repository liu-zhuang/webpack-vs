using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(webpackdemo.Startup))]
namespace webpackdemo
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
