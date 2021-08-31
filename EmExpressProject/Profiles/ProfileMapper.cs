using AutoMapper;
using EmExpressProject.Models;
using EmExpressProject.ModelView;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmExpressProject.Profiles
{
    public class ProfileMapper : Profile
    {
        public ProfileMapper()
        {
            CreateMap<Products, ProductsViewModel>().ReverseMap();
        }
    }
}
