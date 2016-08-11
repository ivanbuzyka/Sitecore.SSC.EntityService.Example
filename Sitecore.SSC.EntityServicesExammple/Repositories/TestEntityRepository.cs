using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Sitecore.Services.Core;
using Sitecore.SSC.EntityServicesExammple.Models;

namespace Sitecore.SSC.EntityServicesExammple.Repositories
{
    public class TestEntityRepository : IRepository<TestEntity>
    {
        private static Dictionary<Guid, TestEntity> _testDB;

        static TestEntityRepository()
        {
            _testDB = new Dictionary<Guid, TestEntity>();

            var id1 = Guid.NewGuid();
            _testDB.Add(id1, new TestEntity {Id = id1.ToString(), Text = Sitecore.Context.User.Name + " is current user", Title = "Title 1"});

            var id2 = Guid.NewGuid();
            _testDB.Add(id2, new TestEntity { Id = id2.ToString(), Text = Sitecore.Context.Database.Name + " is current DB name", Title = "Title 2" });

        }

        public IQueryable<TestEntity> GetAll()
        {
            return _testDB.Values.AsQueryable();
        }

        public TestEntity FindById(string id)
        {
            Guid guidId;
            Guid.TryParse(id, out guidId);
            if (_testDB.ContainsKey(guidId))
            {
                return _testDB[guidId];
            }

            return null;
        }

        public void Add(TestEntity entity)
        {
            var newGuid = Guid.NewGuid();
            entity.Id = newGuid.ToString();
            _testDB.Add(newGuid, entity);
        }

        public bool Exists(TestEntity entity)
        {
            Guid guid;
            Guid.TryParse(entity.Id, out guid);

            return _testDB.ContainsKey(guid);
        }

        public void Update(TestEntity entity)
        {
            Guid guid;
            Guid.TryParse(entity.Id, out guid);

            if (_testDB.ContainsKey(guid))
            {
                _testDB[guid] = entity;
                return;
            }

            _testDB.Add(guid, entity);
        }

        public void Delete(TestEntity entity)
        {
            Guid guid;
            Guid.TryParse(entity.Id, out guid);

            if (_testDB.ContainsKey(guid))
            {
                _testDB.Remove(guid);
            }
        }
    }
}