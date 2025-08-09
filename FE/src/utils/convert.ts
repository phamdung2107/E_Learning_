export const convertCategoriesToTreeData: any = (categoriesObj: any) => {
    const categories = Array.isArray(categoriesObj)
        ? categoriesObj
        : Object.values(categoriesObj)

    return categories.map((cat: any) => ({
        ...cat,
        title: cat.name,
        value: cat.id,
        key: cat.id,
        children: cat.children
            ? convertCategoriesToTreeData(cat.children)
            : null,
    }))
}

export function convertLessonWithQuizData(lessonWithQuiz: any) {
    const result: any[] = []

    for (const lesson of lessonWithQuiz) {
        const allQuizzesPass =
            lesson.quizzes && lesson.quizzes.length > 0
                ? lesson.quizzes.every(
                      (quiz: any) => quiz.latest_result_quiz?.is_pass === 1
                  )
                : false

        result.push({
            id: lesson.id,
            type: 'lesson',
            is_pass: allQuizzesPass ? 1 : 0,
        })

        if (lesson.quizzes && lesson.quizzes.length > 0) {
            for (const quiz of lesson.quizzes) {
                const quizIsPass = quiz.latest_result_quiz?.is_pass ?? 0
                result.push({
                    id: quiz.id,
                    lesson_id: quiz.lesson_id,
                    type: 'quiz',
                    is_pass: quizIsPass,
                })
            }
        }
    }

    return result
}
