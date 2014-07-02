/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.ifes.leds.sincap.web.controller;

import br.ifes.leds.reuse.ledsExceptions.CRUDExceptions.ViolacaoDeRIException;
import br.ifes.leds.sincap.gerenciaNotificacao.cln.cdp.DTO.AtualizacaoEstadoDTO;
import br.ifes.leds.sincap.gerenciaNotificacao.cln.cdp.DTO.EntrevistaDTO;
import br.ifes.leds.sincap.gerenciaNotificacao.cln.cdp.DTO.ProcessoNotificacaoDTO;
import br.ifes.leds.sincap.gerenciaNotificacao.cln.cdp.EstadoNotificacaoEnum;
import br.ifes.leds.sincap.gerenciaNotificacao.cln.cgt.AplProcessoNotificacao;
import javax.faces.bean.SessionScoped;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author marcosdias
 */
@Controller
@RequestMapping(ContextUrls.APP_NOTIFICACAO_ENTREVISTA)
@SessionScoped
public class NotificacaoEntrevistaController {

    @Autowired
    AplProcessoNotificacao aplProcessoNotificacao;

    @RequestMapping(method = RequestMethod.GET)
    public String loadListObitoAguardandoEntrevista() {
        return "entrevista";
    }

    @RequestMapping(value = ContextUrls.ADICIONAR, method = RequestMethod.GET)
    public String loadFormEntrevista(@ModelAttribute Long idProcessoNotificacao, ModelMap model) {
        try {
            ProcessoNotificacaoDTO pnDTO = aplProcessoNotificacao.obter(idProcessoNotificacao);
            EntrevistaDTO novaEntrevista = new EntrevistaDTO();
            pnDTO.setEntrevista(novaEntrevista);

            model.addAttribute("processoNotificacaoDTO", pnDTO);

        } catch (Exception e) {

        }

        return "form-entrevista";
    }

    @RequestMapping(value = ContextUrls.SALVAR, method = RequestMethod.POST)
    public String cadastrarEntrevista(@ModelAttribute ProcessoNotificacaoDTO processoNotificacaoDTO,
            ModelMap model) {
        try {
            modificaEstadoAtual(processoNotificacaoDTO, EstadoNotificacaoEnum.AGUARDANDOANALISEENTREVISTA);

            aplProcessoNotificacao.salvarEntrevista(processoNotificacaoDTO);

        } catch (ViolacaoDeRIException e) {
            
        }

        return "entrevista";
    }

    @RequestMapping(value = ContextUrls.APP_ANALISAR, method = RequestMethod.GET)
    public String loadAnalisaNotificacaoEntrevista(@ModelAttribute Long id, ModelMap model) {
        try {
            ProcessoNotificacaoDTO pnDTO = aplProcessoNotificacao.obter(id);
            modificaEstadoAtual(pnDTO, EstadoNotificacaoEnum.EMANALISEENTREVISTA);
            aplProcessoNotificacao.salvarEntrevista(pnDTO);

            model.addAttribute("processoNotificacaoDTO", pnDTO);
        } catch (ViolacaoDeRIException e) {
        }
        return "analise-entrevista";
    }

    @RequestMapping(value = ContextUrls.RECUSAR, method = RequestMethod.POST)
    public String recusarEntrevista(@ModelAttribute ProcessoNotificacaoDTO processoNotificacaoDTO, ModelMap model) {
        modificaEstadoAtual(processoNotificacaoDTO, EstadoNotificacaoEnum.AGUARDANDOENTREVISTA);
        try {
            aplProcessoNotificacao.salvarEntrevista(processoNotificacaoDTO);
        } catch (ViolacaoDeRIException e) {
        }
        
        return "analise-entrevista";
    }

    @RequestMapping(value = ContextUrls.CONFIRMAR, method = RequestMethod.POST)
    public String confirmarEntrevista(@ModelAttribute ProcessoNotificacaoDTO processoNotificacaoDTO,
            ModelMap model) {
        modificaEstadoAtual(processoNotificacaoDTO, EstadoNotificacaoEnum.AGUARDANDOCAPTACAO);
        try {
            aplProcessoNotificacao.salvarEntrevista(processoNotificacaoDTO);
        } catch (ViolacaoDeRIException e) {
        }
        return "analise-entrevista";
    }

    @RequestMapping(value = ContextUrls.ARQUIVAR, method = RequestMethod.POST)
    public String arquivarEntrevista(@ModelAttribute ProcessoNotificacaoDTO processoNotificacaoDTO,
            ModelMap model) {
        modificaEstadoAtual(processoNotificacaoDTO, EstadoNotificacaoEnum.NOTIFICACAOARQUIVADA);
        try {
            aplProcessoNotificacao.salvarEntrevista(processoNotificacaoDTO);
        } catch (ViolacaoDeRIException e) {
        }
        return "analise-entrevista";
    }
    
    private String finalizarAnaliseEntrevista(ProcessoNotificacaoDTO processoNotificacaoDTO, EstadoNotificacaoEnum ESTADO){
        modificaEstadoAtual(processoNotificacaoDTO, EstadoNotificacaoEnum.NOTIFICACAOARQUIVADA);
        try {
            aplProcessoNotificacao.salvarEntrevista(processoNotificacaoDTO);
        } catch (ViolacaoDeRIException e) {
        }
        return "analise-entrevista";
    }
    
    private void modificaEstadoAtual(ProcessoNotificacaoDTO pnDTO, EstadoNotificacaoEnum ESTADO) {
        AtualizacaoEstadoDTO atualizacaoEstado = new AtualizacaoEstadoDTO();
        atualizacaoEstado.setEstadoNotificacao(ESTADO);
        atualizacaoEstado.setFuncionario(pnDTO.getEntrevista().getFuncionario());
    }
}
