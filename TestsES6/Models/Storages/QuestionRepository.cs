using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestsES6.Models.Entity;
using TestsES6.Models.Interfaces;

namespace TestsES6.Models
{
    public class QuestionRepository : IQuestionRepository
    {

        private readonly ApplicationDbContext _context;
        public QuestionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<QuestionEntity> Questions => _context.QuestionEntities;

        public QuestionEntity GetQuestionById(int questionId)
        {
            return Questions.FirstOrDefault(q => q.Id == questionId);
        }

        public IEnumerable<QuestionEntity> GetRandomElements(int number)
        {
            var result =
               Questions.OrderBy(q => Guid.NewGuid()).Take(number);
            return result;
        }

    }
}