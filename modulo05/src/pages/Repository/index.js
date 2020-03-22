import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';
import { Loading, Owner, IssueList } from './styles';
// import { Container } from './styles';
import Container from '../../components/Containers';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    respository: {},
    issues: [],
    loading: true,
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);
    console.log(repoName);

    // const response = await api.get(`/repos/${repoName}`);
    const [respository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`),
      {
        params: {
          state: 'open',
          per_page: 5,
        },
      },
    ]);
    console.log('aqui');
    console.log(respository);
    console.log(issues);

    // api.github.com/repos/flavio022/portal-de-noticias
    this.setState({
      respository: respository.data,
      issues: issues.data,
      loading: false,
    });
  }

  render() {
    const { respository, issues, loading } = this.state;
    if (loading) {
      return <Loading>Carregando</Loading>;
    }
    return (
      <Container>
        <Owner>
          <Link to="/">Voltar ao repositorios</Link>
          <img
            src={respository.owner.avatar_url}
            alt={respository.owner.login}
          />
          <h1>{respository.name}</h1>
          <p>{respository.description}</p>
        </Owner>
        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}
