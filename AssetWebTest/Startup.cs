using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AssetWebTest.Startup))]
namespace AssetWebTest
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
