import { gql } from "@apollo/client"

export const updateQMutation = gql`
mutation updateQuiz($updateId: String!, $updateQuestion2: String!, $updateAnswer2: String!){
  update(id: $updateId, question: $updateQuestion2, answer: $updateAnswer2) {
    answer
    question
  }
}`

export const getAllQuizes=  gql`
query getAllQuizes{
  quizes {
  answer
  question
  id
  postedBy {
    name
  }
}
}
`
export const deleteQuizql = gql`
  mutation delete($deleteId: String!){
  delete(id: $deleteId) {
    id
    question
  }
}
`
export const createQuizql =gql`
    mutation addQuiz($question: String!, $answer: String!){
  post(question: $question, answer: $answer) {
    id
    question
    answer
    postedBy {
      name
    }
  }
}
`
