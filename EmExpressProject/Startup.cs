using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.EntityFrameworkCore;
using EmExpressProject.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using EmExpressProject.Models;
using EmExpressProject.Interfaces;
using EmExpressProject.Repositories;
using EmExpressProject.Services;
using System.Globalization;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.FileProviders;
using System.IO;
using Microsoft.AspNetCore.Http;

namespace EmExpressProject
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(
                    Configuration.GetConnectionString("Connection")));

            services.AddDbContext<EmExpressDbContext>(options =>
               options.UseSqlServer(
                   Configuration.GetConnectionString("Connection")));

            services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = false)
                .AddEntityFrameworkStores<ApplicationDbContext>();
            services.AddTransient<IGeneralService, GeneralService>();
            services.AddTransient<IProductRepository, ProductRepository>();
            services.AddTransient<IProductService, ProductService>();

            services.AddAutoMapper(typeof(Startup));
            services.AddSession();
            services.AddMvc().AddSessionStateTempDataProvider().AddViewLocalization(
                   LanguageViewLocationExpanderFormat.Suffix,
                   opts => { opts.ResourcesPath = "Resources"; })
                   .AddDataAnnotationsLocalization(options =>
                   {
                       options.DataAnnotationLocalizerProvider = (type, factory) =>
                       factory.Create(typeof(SharedResource));
                   });


            services.Configure<RequestLocalizationOptions>(options =>
            {
                var en = new CultureInfo("en-US");
                en.DateTimeFormat.ShortDatePattern = "dd.MM.yyyy";
                en.DateTimeFormat.LongTimePattern = "HH:mm:ss";
                en.NumberFormat.NumberDecimalSeparator = ".";
                var sr = new CultureInfo("sr-Latn-RS");
                sr.DateTimeFormat.ShortDatePattern = "dd.MM.yyyy";
                sr.DateTimeFormat.LongTimePattern = "HH:mm:ss";
                sr.NumberFormat.NumberDecimalSeparator = ".";
                var al = new CultureInfo("sq-AL");
                al.DateTimeFormat.ShortDatePattern = "dd.MM.yyyy";
                al.DateTimeFormat.LongTimePattern = "HH:mm:ss";
                al.NumberFormat.NumberDecimalSeparator = ".";
                var supportedCultures = new[]
                {
                    al,
                    en,
                    sr

                };
                var requestProvider = options.RequestCultureProviders.OfType<AcceptLanguageHeaderRequestCultureProvider>().First();
                options.RequestCultureProviders.Remove(requestProvider);

                options.DefaultRequestCulture = new RequestCulture(al, al);

                options.SupportedCultures = supportedCultures;
                options.SupportedUICultures = supportedCultures;

            });
            services.AddControllersWithViews();
            services.AddRazorPages();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            var localizationOption = app.ApplicationServices.GetService<IOptions<RequestLocalizationOptions>>();
            app.UseRequestLocalization(localizationOption.Value);

            app.UseSession();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
           // app.UseHttpsRedirection();
            app.UseStaticFiles();
            
            app.UseRouting();
        
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseSession();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{area:exists}/{controller=Home}/{action=Index}/{id?}");
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
            });
        }
    }
}
